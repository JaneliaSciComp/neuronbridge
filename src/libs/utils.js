export function dataVersionFile() {
  return process.env.REACT_APP_LEVEL.match(/^prod/)
    ? "current.txt"
    : "next.txt";
}

export function alt() {
  return true;
}

export function libraryFormatter(library) {
  if (!library) {
    return '';
  }
  return library
    .replace(/_/g, " ")
    .replace(/split-?gal4/i, "Split-GAL4")
    .replace(/flylight/i, "FlyLight")
    .replace(/flyem/i, "FlyEM")
    .replace(/\bmcfo\b/i, "MCFO");
}

// new function,
// expects an object with a files key,
// takes that object and replaces all the urls in the files object
// returns the updated object.
export function updateFilesPaths(files, store, options={}) {
  // loop over all the keys in the files object and remap them to full urls.
  const updated = Object.fromEntries(
    Object.keys(files).map((key) => {
      // skip the store key as it doesn't need to be remapped.
      if (key === "store") {
        return [key, files[key]];
      }
      // we don't need to change the PPPMResults or CDSResults paths
      // as we never look those up with the full url.
      if (key.match(/Results$/)) {
        return [key, files[key]];
      }
      // skips adding the store prefix to the input file for
      // custom searches as the store prefix is always wrong.
      // This needs to be fetched from the private search bucket.
      if (options.custom && key.match(/^CDMInput$/)) {
        return [key, files[key]];
      }
      const fullPath = `${store.prefixes[key]}${files[key]}`;
      return [key, fullPath];
    })
  );
  return updated;
}

export function setResultsFullUrlPaths(newResults, stores, options) {
  const updated = newResults.map((result) => {
    const selectedStore =
      stores[result?.files?.store || result?.image?.store || result.store];

    const updatedResult = {
      ...result,
      files: updateFilesPaths(result.files, selectedStore, options),
    };

    if (result.image) {
      const updatedImage = {
        ...result.image,
        files: updateFilesPaths(result.image.files, selectedStore, options),
      };
      updatedResult.image = updatedImage;
    }
    return updatedResult;
  });
  return updated;
}
