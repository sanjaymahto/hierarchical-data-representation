import DAG from './dag-renderer';
/**
 * @description Function to append SVG element to Selected HTML element.
 * @param  {} mount
 */
export default function dag(mount) {
  if (mount) {
    return (data, config) =>
      new DAG(mount, data, config);
  }
  throw new Error('Please provide the mount Element');
}

