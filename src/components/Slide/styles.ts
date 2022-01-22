import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");
const SIZE = width - 75;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: height / 150,
    alignItems: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    fontSize: 48,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "SFProDisplay-Bold",
  },
  description: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontFamily: "SFProDisplay-Regular",
  },
});

export default styles;
