import { setName } from "document-model";
import type { FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { useSelectedPageDataArchitectureDocument } from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

/** Displays the name of the selected PageDataArchitecture document and allows editing it */
export function EditPageDataArchitectureName() {
  const [pageDataArchitectureDocument, dispatch] =
    useSelectedPageDataArchitectureDocument();
  const [isEditing, setIsEditing] = useState(false);

  if (!pageDataArchitectureDocument) return null;

  const pageDataArchitectureDocumentName =
    pageDataArchitectureDocument.header.name;

  const onClickEditPageDataArchitectureName: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEditing(true);
  };

  const onClickCancelEditPageDataArchitectureName: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEditing(false);
  };

  const onSubmitSetName: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const name = nameInput.value;
    if (!name) return;

    dispatch(setName(name));
    setIsEditing(false);
  };

  if (isEditing)
    return (
      <form
        className="flex gap-2 items-center justify-between"
        onSubmit={onSubmitSetName}
      >
        <input
          className="text-lg font-semibold text-gray-900 p-1"
          type="text"
          name="name"
          defaultValue={pageDataArchitectureDocumentName}
          autoFocus
        />
        <div className="flex gap-2">
          <button type="submit" className="text-sm text-gray-600">
            Save
          </button>
          <button
            className="text-sm text-red-800"
            onClick={onClickCancelEditPageDataArchitectureName}
          >
            Cancel
          </button>
        </div>
      </form>
    );

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">
        {pageDataArchitectureDocumentName}
      </h2>
      <button
        className="text-sm text-gray-600"
        onClick={onClickEditPageDataArchitectureName}
      >
        Edit Name
      </button>
    </div>
  );
}
