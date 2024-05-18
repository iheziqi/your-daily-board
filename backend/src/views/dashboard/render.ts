/**
 * Gets the directory path of the current folder, which is the dashboard template.
 * Because in the ejs.render() a root path need to be specified to get it working.
 * @returns The current directory path.
 */
export function getDirPathOfDashBoardTemplate() {
  return __dirname;
}
