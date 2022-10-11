export function dataVersionFile() {
  return process.env.REACT_APP_LEVEL.match(/^prod/)
    ? "current.txt"
    : "next.txt";
}

export function alt() {
  return true;
}

// new function,
// expects an object with a files key,
// takes that object and replaces all the urls in the files object
// returns the updated object.
export function updateFilesPaths(files, store) {
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
      const fullPath = `${store.prefixes[key]}${files[key]}`;
      // TODO: The fixedPath needs to be removed, once the files have
      // been placed on the correct path on S3.
      const fixedPath = fullPath.replace(/FlyEM_VNC_v0.5/, 'FlyEM_VNC_v0.6');
      return [key, fixedPath];
    })
  );
  return updated;
}

export function setResultsFullUrlPaths(newResults, stores) {
  const updated = newResults.map((result) => {
    const selectedStore =
      stores[result?.files?.store || result?.image?.store || result.store];

    const updatedResult = {
      ...result,
      files: updateFilesPaths(result.files, selectedStore),
    };

    if (result.image) {
      const updatedImage = {
        ...result.image,
        files: updateFilesPaths(result.image.files, selectedStore),
      };
      updatedResult.image = updatedImage;
    }
    return updatedResult;
  });
  return updated;
}
