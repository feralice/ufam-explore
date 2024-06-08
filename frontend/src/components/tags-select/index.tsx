import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { TagListProps } from "./types";

export const TagList = (props: TagListProps) => {
  const { tags, onEdit, onRemove, onAdd, selected } = props;

  return (
    <View style={styles.tagContainer}>
      {tags.map((tag, index) => (
        <View key={index} style={styles.tagWrapper}>
          <TouchableOpacity
            onPress={() => (selected ? onEdit?.(index) : onAdd?.(tag))}
            style={[styles.tag, selected && styles.selectedTag]}
          >
            <AntDesign name="tag" size={14} color="white" />
            <Text style={styles.tagText}>{tag}</Text>
            {selected && (
              <TouchableOpacity
                onPress={() => onRemove?.(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            )}
            {!selected && <Text style={styles.addButtonText}>+</Text>}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default TagList;
