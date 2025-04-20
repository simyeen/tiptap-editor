import TaskItem from '@tiptap/extension-task-item';

export const ConfiguredTaskItem = () =>
  TaskItem.configure({
    nested: true,
  });

export default ConfiguredTaskItem;
