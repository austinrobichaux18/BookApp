import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Book } from "./Book";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [body, setBody] = useState<Book>();
  const setBodyVoid = (s: Book) => setBody(s);
  return (
    <View style={styles.vertical}>
      <View style={{ flex: 0.1 }}>
        <View style={{ backgroundColor: "#f00", flex: 1 }}>
          <Text style={styles.align}>Austin's Book App</Text>
        </View>
      </View>

      <View style={styles.horizontal}>
        <View style={{ backgroundColor: "dodgerblue", flex: 1 }}>
          <GetNames func={setBodyVoid} />
        </View>
        <View style={{ backgroundColor: "gold", flex: 1 }}>
          <DisplayBook bookObj={body} />
        </View>
      </View>
    </View>
  );
}

type displayBookProps = {
  bookObj: Book | undefined;
};
export function DisplayBook(param: displayBookProps) {
  if (param.bookObj == null) {
    return <Text></Text>;
  }
  return (
    <ScrollView style={styles.margin}>
      <Text style={[styles.margin, { fontSize: 20 }]}>
        {param.bookObj.title}
      </Text>
      <Image
        source={{ uri: param.bookObj.thumbnailUrl, height: 100, width: 100 }}
      />
      <Text style={styles.margin}>ISBN: {param.bookObj.isbn}</Text>
      <Text style={styles.margin}>Pages: {param.bookObj.pageCount}</Text>
      <Text style={styles.margin}>
        Published Date: {param.bookObj.publishedDate.$date.substring(0, 10)}
      </Text>
      <Text style={styles.margin}>Status: {param.bookObj.status}</Text>
      <Text style={styles.margin}>
        Authors: {param.bookObj.authors.join(", ")}
      </Text>
      <Text style={styles.margin}>
        Categories: {param.bookObj.categories.join(", ")}
      </Text>
      <Text style={styles.margin}>
        Short Description: {param.bookObj.shortDescription}
      </Text>
      <Text style={styles.margin}>
        Long Description: {param.bookObj.longDescription}
      </Text>
    </ScrollView>
  );
}
// Loops over properties. Can't change order of displays.
// return (
//   <ScrollView style={{ margin: 4 }}>
//     {Object.keys(param.bookObj).map((o: string) => (
//       <Text style={{ margin: 4 }}>
//         {o}: {(param.bookObj as any)[o].toString() as string}
//       </Text>
//     ))}
//   </ScrollView>
// );

type getNameProps = {
  func: (b: Book) => void;
};
export function GetNames(param: getNameProps) {
  const customData: Book[] = require("./Samples/bookListSample.json");
  return (
    <ScrollView>
      <Text style={[styles.margin, { fontSize: 20 }]}>Books</Text>
      {customData.map((x) => (
        <TouchableOpacity onPress={() => param.func(x)}>
          <Text style={{ margin: 8 }}>{x.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: "row",
  },
  align: {
    padding: Platform.OS == "android" ? 40 : 0,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
  },
  margin: {
    margin: 4,
  },
  vertical: {
    flex: 1,
    flexDirection: "column",
  },
});
