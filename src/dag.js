import DAG from './dag-renderer';
import convertData from './data-converter';
/**
 * @description Function to append SVG element to Selected HTML element.
 * @param  {} mount
 */
export default function dag(mount) {
  if (mount) {
    return (data, config) => {
      let convertedData = convertData(data);
      return new DAG(mount, convertedData.adgData, convertedData.csvData, config);
    };
  }
  throw new Error('Please provide the mount Element');
}

