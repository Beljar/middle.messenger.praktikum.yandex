export const getFormValues: <T>(formId: string) => T = <T>(formId: string) => {
  return (
    Array.from(
      document.querySelectorAll(`#${formId} input, #${formId} textarea`)
    ) as HTMLInputElement[]
  ).reduce((acc, input) => {
    return { ...acc, [input.name]: input.value };
  }, {} as T);
};
