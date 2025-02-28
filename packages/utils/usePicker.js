//import { computed } from "vue";

export function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (match, letter) => {
    return letter.toUpperCase();
  });
}


export default function (props) {
  function formatProps() {
    const result = {};
    for (const key in props) {
      result[toCamelCase(key)] = props[key];
    }
    return result;
  }
  // 读取options item 的值
  function getItemValue(item) {
    const { emitValue, optionValue } = formatProps(props);
    console.log('++', emitValue, optionValue);

    if (emitValue && typeof item === "object") {
      return item[optionValue];
    }
    return item;
  }

  return { getItemValue };
}
