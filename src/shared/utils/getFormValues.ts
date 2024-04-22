export const getFormValues = (formId: string) => {
  return (
    Array.from(
      document.querySelectorAll(`#${formId} input`)
    ) as HTMLInputElement[]
  ).reduce((acc, input) => {
    return { ...acc, [input.name]: input.value };
  }, {});
};
