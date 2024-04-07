export const getFormValues = (formId: string) => {
  return Array.from(document.querySelectorAll(`#${formId} input`)).reduce(
    (acc, input) => {
      return { ...acc, [input.name]: input.value };
    },
    {}
  );
};
