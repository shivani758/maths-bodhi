import {
  TUTOR_BOARD_OPTIONS,
  TUTOR_CITY_OPTIONS,
  TUTOR_CLASS_OPTIONS,
  TUTOR_LOCALITY_OPTIONS,
  TUTOR_SERVICE_MODE_OPTIONS,
  TUTOR_STATUS_OPTIONS,
  TUTOR_TOPIC_OPTIONS,
} from "../contentOptions";
import { slugifyValue } from "../utils/formValidation";
import {
  FieldGroup,
  FormSection,
  MediaPickerField,
  RichTextEditorField,
  SeoFieldsPanel,
  ToggleField,
  formatLineList,
  getFieldControlClass,
  parseLineList,
} from "./primitives";

function updateTutor(draftItem, patch) {
  return {
    ...draftItem,
    tutor: {
      ...draftItem.tutor,
      ...patch,
    },
  };
}

function updateProfile(draftItem, patch) {
  return {
    ...draftItem,
    profile: {
      ...draftItem.profile,
      ...patch,
    },
  };
}

function mergeOptions(primary = [], secondary = []) {
  return [...new Set([...(primary ?? []), ...(secondary ?? [])].filter(Boolean))];
}

function formatOptionLabel(value) {
  return String(value ?? "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toggleValue(values = [], value) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function ChecklistField({
  label,
  helpText,
  error,
  required = false,
  options,
  value = [],
  onChange,
  columns = "sm:grid-cols-2",
  maxHeightClassName = "max-h-56",
}) {
  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="ml-1 text-rose-600">*</span> : null}
      </span>
      <div
        className={`${maxHeightClassName} overflow-y-auto rounded-2xl border bg-white p-3 ${
          error ? "border-rose-300 bg-rose-50" : "border-slate-200"
        }`}
      >
        <div className={`grid gap-2 ${columns}`}>
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onChange(toggleValue(value, item))}
              className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                value.includes(item)
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700"
              }`}
              aria-pressed={value.includes(item)}
            >
              {formatOptionLabel(item)}
            </button>
          ))}
        </div>
      </div>
      {error ? <span className="mt-2 block text-xs leading-5 text-rose-600">{error}</span> : null}
      {helpText ? <span className="mt-2 block text-xs leading-5 text-slate-500">{helpText}</span> : null}
    </div>
  );
}

function TutorForm({
  draftItem,
  setDraftItem,
  mediaOptions,
  reviewOptions,
  resultOptions,
  pageOptions,
  cityOptions = [],
  localityOptions = [],
  errors = {},
}) {
  const tutor = draftItem.tutor;
  const profile = draftItem.profile;
  const boardOptions = mergeOptions(TUTOR_BOARD_OPTIONS, tutor.boards);
  const classOptions = mergeOptions(TUTOR_CLASS_OPTIONS, tutor.classesSupported);
  const topicOptions = mergeOptions(TUTOR_TOPIC_OPTIONS, tutor.topics);
  const serviceModeOptions = mergeOptions(TUTOR_SERVICE_MODE_OPTIONS, tutor.serviceModes);
  const cityValueOptions = mergeOptions(
    TUTOR_CITY_OPTIONS,
    cityOptions.map((city) => city.slug),
  );
  const cityOptionsWithSavedValues = mergeOptions(
    cityValueOptions,
    tutor.cities,
  );
  const localityValueOptions = mergeOptions(
    TUTOR_LOCALITY_OPTIONS,
    localityOptions.map((locality) => locality.sectorLabel),
  );
  const localityOptionsWithSavedValues = mergeOptions(
    localityValueOptions,
    tutor.localities,
  );

  return (
    <div className="space-y-5">
      <FormSection
        title="Tutor Basics"
        description="These fields drive tutor listings, tutor profiles, public visibility, and the connected tutor API payload."
      >
        <FieldGroup label="Name" required error={errors.name}>
          <input
            value={tutor.name}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(current, {
                  name: event.target.value,
                  slug: current.tutor.slug || slugifyValue(event.target.value),
                }),
              )
            }
            className={getFieldControlClass(errors.name)}
          />
        </FieldGroup>

        <FieldGroup label="Slug" required error={errors.slug} helpText="Use lowercase words separated by hyphens.">
          <input
            value={tutor.slug}
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { slug: slugifyValue(event.target.value) }))
            }
            className={getFieldControlClass(errors.slug)}
          />
        </FieldGroup>

        <FieldGroup label="Status" required error={errors.status}>
          <select
            value={tutor.status}
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { status: event.target.value }))
            }
            className={getFieldControlClass(errors.status)}
          >
            {TUTOR_STATUS_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Experience Years" required error={errors.experienceYears}>
          <input
            type="number"
            min="1"
            value={tutor.experienceYears ?? ""}
            onChange={(event) => {
              const nextValue = Number(event.target.value);
              setDraftItem((current) =>
                updateTutor(current, {
                  experienceYears: nextValue,
                  experienceLabel: Number.isFinite(nextValue) && nextValue > 0 ? `${nextValue} years` : "",
                  experience: Number.isFinite(nextValue) && nextValue > 0 ? `${nextValue} years` : "",
                }),
              );
            }}
            className={getFieldControlClass(errors.experienceYears)}
          />
        </FieldGroup>

        <FieldGroup label="Title" required fullWidth error={errors.title}>
          <input
            value={tutor.title}
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { title: event.target.value }))
            }
            className={getFieldControlClass(errors.title)}
          />
        </FieldGroup>

        <FieldGroup label="Short Bio" required fullWidth error={errors.shortBio}>
          <textarea
            rows={3}
            value={tutor.shortBio}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(current, { shortBio: event.target.value, summary: event.target.value }),
              )
            }
            className={getFieldControlClass(errors.shortBio)}
          />
        </FieldGroup>

        <FieldGroup
          label="Starting Fee"
          required
          error={errors.startingFee}
          helpText="Use a public-friendly format, e.g. Rs 1,500 per class or Shared on enquiry."
        >
          <input
            value={tutor.startingFee}
            placeholder="Rs 1,500 per class"
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { startingFee: event.target.value }))
            }
            className={getFieldControlClass(errors.startingFee)}
          />
        </FieldGroup>

        <FieldGroup label="Rating" error={errors.rating} helpText="Use values like 4.8. Do not enter fake ratings.">
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={tutor.rating}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(current, {
                  rating: event.target.value === "" ? "" : Number(event.target.value),
                }),
              )
            }
            className={getFieldControlClass(errors.rating)}
          />
        </FieldGroup>

        <FieldGroup
          label="Display Order"
          error={errors.displayOrder}
          helpText="Lower number appears earlier. Use 1 for top priority, 99 for normal listing."
        >
          <input
            type="number"
            min="0"
            value={tutor.displayOrder}
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { displayOrder: Number(event.target.value) }))
            }
            className={getFieldControlClass(errors.displayOrder)}
          />
        </FieldGroup>
      </FormSection>

      <FormSection
        title="Teaching Fit"
        description="Select the main boards, classes, and service types that should be visible on tutor discovery pages."
      >
        <ChecklistField
          label="Boards"
          required
          error={errors.boards}
          options={boardOptions}
          value={tutor.boards}
          onChange={(values) =>
            setDraftItem((current) => updateTutor(current, { boards: values, boardTags: values }))
          }
        />

        <ChecklistField
          label="Classes Supported"
          required
          error={errors.classesSupported}
          options={classOptions}
          value={tutor.classesSupported}
          onChange={(values) =>
            setDraftItem((current) => updateTutor(current, { classesSupported: values }))
          }
        />

        <ChecklistField
          label="Topics"
          required
          error={errors.topics}
          helpText="Select the visible maths topics for this tutor."
          options={topicOptions}
          value={tutor.topics}
          onChange={(values) =>
            setDraftItem((current) => updateTutor(current, { topics: values, topicTags: values }))
          }
        />

        <ChecklistField
          label="Service Modes"
          required
          error={errors.serviceModes}
          options={serviceModeOptions}
          value={tutor.serviceModes}
          onChange={(values) =>
            setDraftItem((current) =>
              updateTutor(current, { serviceModes: values, serviceModeTags: values }),
            )
          }
        />

        <ChecklistField
          label="Cities"
          error={errors.cities}
          options={cityOptionsWithSavedValues}
          value={tutor.cities}
          onChange={(values) => setDraftItem((current) => updateTutor(current, { cities: values }))}
          maxHeightClassName="max-h-40"
        />

        <ChecklistField
          label="Localities"
          error={errors.localities}
          options={localityOptionsWithSavedValues}
          value={tutor.localities}
          onChange={(values) =>
            setDraftItem((current) => updateTutor(current, { localities: values, localityTags: values }))
          }
          maxHeightClassName="max-h-64"
        />

        <FieldGroup label="Badges / Chips" helpText="One badge per line." error={errors.badges}>
          <textarea
            rows={4}
            value={formatLineList(tutor.badges)}
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { badges: parseLineList(event.target.value) }))
            }
            className={getFieldControlClass(errors.badges)}
          />
        </FieldGroup>
      </FormSection>

      <FormSection
        title="Profile Details"
        description="These fields add profile depth without changing the current admin layout structure."
      >
        <RichTextEditorField
          label="Full Bio"
          value={profile.longFormProfile}
          onChange={(value) => {
            setDraftItem((current) =>
              updateTutor(
                updateProfile(current, { longFormProfile: value }),
                { fullBio: value, summary: current.tutor.summary || value.slice(0, 180) },
              ),
            );
          }}
          helpText="Use plain text for now. This preview panel is a lightweight stand-in for a future rich editor."
          error={errors.fullBio}
        />

        <FieldGroup label="Qualifications" helpText="One qualification per line." error={errors.qualifications}>
          <textarea
            rows={5}
            value={formatLineList(profile.qualifications)}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(
                  updateProfile(current, { qualifications: parseLineList(event.target.value) }),
                  { qualifications: parseLineList(event.target.value) },
                ),
              )
            }
            className={getFieldControlClass(errors.qualifications)}
          />
        </FieldGroup>

        <FieldGroup label="Achievements" helpText="One achievement per line." error={errors.achievements}>
          <textarea
            rows={5}
            value={formatLineList(profile.achievements)}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(
                  updateProfile(current, { achievements: parseLineList(event.target.value) }),
                  { achievements: parseLineList(event.target.value) },
                ),
              )
            }
            className={getFieldControlClass(errors.achievements)}
          />
        </FieldGroup>

        <FieldGroup label="Teaching Style" fullWidth error={errors.teachingStyle}>
          <textarea
            rows={4}
            value={profile.teachingStyle}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(updateProfile(current, { teachingStyle: event.target.value }), {
                  teachingStyle: event.target.value,
                }),
              )
            }
            className={getFieldControlClass(errors.teachingStyle)}
          />
        </FieldGroup>
      </FormSection>

      <FormSection
        title="Links, Media, And Availability"
        description="These links and visibility controls decide where the tutor can surface publicly."
      >
        <MediaPickerField
          label="Profile Image"
          value={tutor.image}
          onChange={(value) =>
            setDraftItem((current) =>
              updateTutor(current, { image: value, seo: { ...current.tutor.seo, ogImage: value } }),
            )
          }
          assets={mediaOptions}
          error={errors.image}
        />

        <FieldGroup label="Image Alt Text" error={errors.imageAlt}>
          <input
            value={tutor.imageAlt}
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { imageAlt: event.target.value }))
            }
            className={getFieldControlClass(errors.imageAlt)}
          />
        </FieldGroup>

        <FieldGroup label="Availability" error={errors.availability}>
          <input
            value={tutor.availability}
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { availability: event.target.value }))
            }
            className={getFieldControlClass(errors.availability)}
          />
        </FieldGroup>

        <FieldGroup label="Availability Status" error={errors.availabilityStatus}>
          <select
            value={tutor.availabilityStatus}
            onChange={(event) =>
              setDraftItem((current) => updateTutor(current, { availabilityStatus: event.target.value }))
            }
            className={getFieldControlClass(errors.availabilityStatus)}
          >
            {["available", "limited", "waitlist"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="School Focus" helpText="One school or school cluster per line." error={errors.schoolFocus}>
          <textarea
            rows={4}
            value={formatLineList(tutor.schoolFocus)}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(current, {
                  schoolFocus: parseLineList(event.target.value),
                  schoolFitTags: parseLineList(event.target.value),
                }),
              )
            }
            className={getFieldControlClass(errors.schoolFocus)}
          />
        </FieldGroup>

        <FieldGroup label="Linked Reviews" error={errors.linkedReviewIds}>
          <select
            multiple
            value={tutor.linkedReviewIds}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(current, {
                  linkedReviewIds: Array.from(event.target.selectedOptions, (option) => option.value),
                }),
              )
            }
            className={getFieldControlClass(errors.linkedReviewIds, "h-32")}
          >
            {reviewOptions.map((review) => (
              <option key={review.id} value={review.id}>
                {review.reviewerName}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Linked Results" error={errors.linkedResultIds}>
          <select
            multiple
            value={tutor.linkedResultIds}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(current, {
                  linkedResultIds: Array.from(event.target.selectedOptions, (option) => option.value),
                }),
              )
            }
            className={getFieldControlClass(errors.linkedResultIds, "h-32")}
          >
            {resultOptions.map((result) => (
              <option key={result.id} value={result.id}>
                {result.studentLabel}
              </option>
            ))}
          </select>
        </FieldGroup>

        <FieldGroup label="Featured On Pages" error={errors.featuredOn}>
          <select
            multiple
            value={tutor.featuredOn}
            onChange={(event) =>
              setDraftItem((current) =>
                updateTutor(current, {
                  featuredOn: Array.from(event.target.selectedOptions, (option) => option.value),
                }),
              )
            }
            className={getFieldControlClass(errors.featuredOn, "h-32")}
          >
            {pageOptions.map((page) => (
              <option key={page.id} value={page.pageKey || page.slug}>
                {page.label || page.title}
              </option>
            ))}
          </select>
        </FieldGroup>

        <div className="space-y-3 md:col-span-2">
          <ToggleField
            label="Featured Tutor"
            description="Use this for tutors who should be easier to surface across discovery routes."
            checked={tutor.featured}
            onChange={(checked) => setDraftItem((current) => updateTutor(current, { featured: checked }))}
          />
          <ToggleField
            label="Show On Homepage"
            description="Keeps the tutor available for the public homepage shortlist."
            checked={tutor.featuredInHome}
            onChange={(checked) =>
              setDraftItem((current) => updateTutor(current, { featuredInHome: checked }))
            }
          />
        </div>
      </FormSection>

      <SeoFieldsPanel
        value={tutor.seo}
        onChange={(seo) => setDraftItem((current) => updateTutor(current, { seo }))}
        errors={errors}
      />
    </div>
  );
}

export default TutorForm;
