import Text from "./Text";
import { View } from "react-native";

const DataItem = ({ name, amount, style }) => {
  let stringAmount = `${amount}`;
  if (amount >= 1000) {
    stringAmount = `${(amount / 1000).toPrecision(3)}k`;
  }
  return (
    <View style={style}>
      <Text fontWeight={"bold"}>{stringAmount}</Text>
      <Text>{name}</Text>
    </View>
  );
};

export default DataItem;
