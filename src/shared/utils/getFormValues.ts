export const getFormValues = (formId: string) => {
  return Array.from(
    document.querySelectorAll(`${formId} input`).reduce((input, acc) => {
      return { ...acc, [input.name]: input.value };
    }, {})
  );
};
