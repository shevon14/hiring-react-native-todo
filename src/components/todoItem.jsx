import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, sizes } from "../theme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {

  // animations
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withTiming(0.8, { duration: 100 }, () => { // Shrink animation
      scale.value = withTiming(1, { duration: 100 }); // Pop back to normal size
    });
    onToggle(todo.id);
  };

  return (
    <View style={styles.row}>
      {/* Animated checkbox section */}
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          onPress={() => {
            handlePress();
          }}
        >
          <Ionicons
            name={todo.completed ? "checkbox" : "square"}
            size={sizes.h2 * 2}
            color={todo.completed ? colors.teal : colors.black}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Text section: single press -> edit, long press -> delete */}
      <TouchableOpacity
        onPress={() => {
          onEdit(todo);
        }}
        onLongPress={() => {
          onDelete(todo.id);
        }}
      >
        <Text
          style={todo.completed ? [styles.text, styles.textDone] : styles.text}
        >
          {todo.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(TodoItem);

// styles
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  text: {
    fontSize: sizes.h2,
    color: colors.black,
    fontFamily: 'TextFont',
    lineHeight: 25,
    marginLeft: 10,
  },
  textDone: {
    color: colors.grey,
    textDecorationLine: "line-through",
  },
});
