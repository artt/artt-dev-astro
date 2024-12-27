import deepmerge from "deepmerge";

export function shuffle(array: any[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function formatDate(date: Date): string {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0].replaceAll('-', '⋅')
}

// https://github.com/TehShrike/deepmerge#arraymerge-example-combine-arrays
export const combineMerge = (target: any, source: any, options: any) => {
  const destination = target.slice()

  source.forEach((item: any, index: number) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, options)
    } else if (target.indexOf(item) === -1) {
      destination.push(item)
    }
  })
  return destination
}

// export function removeTrailingSlash(path: string) {
//   return path === "/" ? path : path.replace(/\/$/, "")
// }

export function addTrailingSlash(path: string) {
  // add trailing slash if path doesn't end with slash already
  return path.endsWith("/") ? path : path + "/"
}

// append array of path to form full path, ensuring there's no double slash, etc.
export function joinPath(paths: string[], prependSlash=true, appendSlash=true) {
  let path = paths.join("/")
  if (prependSlash) path = "/" + path
  if (appendSlash) path = path + "/"
  return path.replace(/\/{2,}/g, "/")
}