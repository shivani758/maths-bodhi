import { useEffect, useState } from "react";
import { listCities, listLocalities } from "../../services/locationsService";
import { listPages } from "../../services/pagesService";
import { createEmptyFaq, deleteFaq, listFaqs, saveFaq } from "../../services/faqsService";
import AdminCollectionPage from "../components/AdminCollectionPage";
import { StatusBadge } from "../components/primitives";
import { FaqForm } from "../forms/simpleForms";

function FaqsPage() {
  const [resources, setResources] = useState({
    pages: [],
    cities: [],
    localities: [],
  });
  const [loadingResources, setLoadingResources] = useState(true);
  const [resourceNotice, setResourceNotice] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      const [pagesResult, citiesResult, localitiesResult] = await Promise.allSettled([
        listPages(),
        listCities(),
        listLocalities(),
      ]);

      if (!mounted) {
        return;
      }

      setResources({
        pages: pagesResult.status === "fulfilled" ? pagesResult.value : [],
        cities: citiesResult.status === "fulfilled" ? citiesResult.value : [],
        localities: localitiesResult.status === "fulfilled" ? localitiesResult.value : [],
      });
      const failedResources = [
        pagesResult.status === "rejected" ? "page links" : "",
        citiesResult.status === "rejected" ? "city links" : "",
        localitiesResult.status === "rejected" ? "locality links" : "",
      ].filter(Boolean);

      setResourceNotice(
        failedResources.length
          ? `Some FAQ link options could not be loaded: ${failedResources.join(", ")}. Existing FAQs can still be reviewed and edited.`
          : "",
      );
      setLoadingResources(false);
    }

    loadResources();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AdminCollectionPage
      eyebrow="FAQ Management"
      title="FAQs"
      description="Manage page-linked FAQs separately while keeping the copy aligned to visible public content."
      createLabel="Add FAQ"
      queryPlaceholder="Search by question, answer, or linked item"
      loader={listFaqs}
      createEmptyItem={createEmptyFaq}
      saveItem={saveFaq}
      deleteItem={deleteFaq}
      searchFields={["question", "answer", "linkedLabel"]}
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
          key: "question",
          label: "FAQ",
          render: (item) => (
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.question}</p>
              <p className="mt-1 text-sm text-slate-500">{item.linkedLabel}</p>
            </div>
          ),
        },
        {
          key: "linkedType",
          label: "Linked Type",
          render: (item) => <p className="text-sm font-semibold capitalize text-slate-700">{item.linkedType}</p>,
        },
        {
          key: "status",
          label: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
      getItemLabel={(item) => item.question || "FAQ"}
      renderForm={({ draftItem, setDraftItem }) => (
        <>
          {loadingResources || resourceNotice ? (
            <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
              {loadingResources
                ? "FAQ link options are loading in the background. You can write the FAQ now and link it after the options appear."
                : resourceNotice}
            </div>
          ) : null}
          <FaqForm
            draftItem={draftItem}
            setDraftItem={setDraftItem}
            pageOptions={resources.pages}
            cityOptions={resources.cities}
            localityOptions={resources.localities}
          />
        </>
      )}
    />
  );
}

export default FaqsPage;
