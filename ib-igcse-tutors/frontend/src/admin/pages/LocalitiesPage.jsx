import { useEffect, useState } from "react";
import { createEmptyLocality, deleteLocality, listCities, listLocalities, saveLocality } from "../../services/locationsService";
import AdminCollectionPage from "../components/AdminCollectionPage";
import LocationOptionsPanel from "../components/LocationOptionsPanel";
import { StatusBadge } from "../components/primitives";
import { getCityOptionsWithDefaults } from "../defaultLocationOptions";
import { LocalityForm } from "../forms/simpleForms";

function LocalitiesPage() {
  const [cities, setCities] = useState([]);
  const [cityLoadError, setCityLoadError] = useState("");

  useEffect(() => {
    let mounted = true;

    listCities()
      .then((items) => {
        if (mounted) {
          setCities(items);
        }
      })
      .catch((error) => {
        if (mounted) {
          setCityLoadError(error?.message || "City options are unavailable right now.");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const cityOptions = getCityOptionsWithDefaults(cities);

  return (
    <div className="space-y-6">
      <LocationOptionsPanel mode="localities" />
      {cityLoadError ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          {cityLoadError} You can still use the reference city options while adding a locality.
        </div>
      ) : null}
      <AdminCollectionPage
        eyebrow="Geo Pages"
        title="Localities"
        description="Control locality pages that connect neighborhood context with maths demand and service fit."
        createLabel="Add Locality"
        queryPlaceholder="Search by locality, city, or headline"
        loader={listLocalities}
        createEmptyItem={createEmptyLocality}
        saveItem={saveLocality}
        deleteItem={deleteLocality}
        searchFields={["sectorLabel", "headline", "subtitle", "cityLabel"]}
        filters={[
          {
            key: "status",
            label: "Status",
            defaultValue: "all",
            options: [
              { value: "all", label: "All statuses" },
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "archived", label: "Archived" },
            ],
            matches: (item, value) => value === "all" || item.status === value,
          },
        ]}
        columns={[
          {
            key: "sectorLabel",
            label: "Locality",
            render: (item) => (
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.sectorLabel}</p>
                <p className="mt-1 text-sm text-slate-500">{item.cityLabel}</p>
              </div>
            ),
          },
          {
            key: "headline",
            label: "Headline",
            render: (item) => <p className="max-w-md text-sm leading-6 text-slate-700">{item.headline}</p>,
          },
          {
            key: "status",
            label: "Status",
            render: (item) => <StatusBadge status={item.status} />,
          },
        ]}
        getItemLabel={(item) => item.sectorLabel || "locality"}
        renderForm={({ draftItem, setDraftItem }) => (
          <LocalityForm
            draftItem={draftItem}
            setDraftItem={setDraftItem}
            cityOptions={cityOptions}
          />
        )}
      />
    </div>
  );
}

export default LocalitiesPage;
