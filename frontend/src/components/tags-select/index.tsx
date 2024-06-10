import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { styles } from "./style";
import { TagListProps } from "./types";

export const TagList = (props: TagListProps) => {
  const { tags, onEdit, onRemove, onAdd, selected } = props;

  return (
    <View style={styles.tagContainer}>
      {tags.map((tag, index) => (
        <View key={index} style={styles.tagWrapper}>
          <Pressable
            onPress={() => (selected ? onEdit?.(index) : onAdd?.(tag))}
            style={[styles.tag, selected && styles.selectedTag]}
          >
            <AntDesign name="tag" size={14} color="white" />
            <Text style={styles.tagText}>{tag}</Text>
            {selected && (
              <Pressable
                onPress={() => onRemove?.(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </Pressable>
            )}
            {!selected && <Text style={styles.addButtonText}>+</Text>}
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default TagList;
