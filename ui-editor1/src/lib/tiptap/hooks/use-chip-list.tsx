import {useMemo, useReducer, useState} from 'react';

import {ActionTypes, selectedItemsReducer} from '../reducer/chip-list-reducer';

export default function useChipList({setTags}: {setTags?: (tags: string[]) => void}) {
  const [selectedItems, dispatch] = useReducer(selectedItemsReducer, []);

  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function removeFromSelection(item: string) {
    const action = {type: ActionTypes.REMOVE_ITEM, payload: item};
    dispatch(action);
    if (setTags) {
      const nextState = selectedItemsReducer(selectedItems, action);
      setTags(nextState);
    }
  }

  function addToSelectionWithItem(item: string) {
    if (selectedItems.findIndex((selectedItem) => selectedItem === item) === -1) {
      if (item.length > 0) {
        const action = {type: ActionTypes.ADD_ITEM, payload: item};
        dispatch(action);
        if (setTags) {
          const nextState = selectedItemsReducer(selectedItems, action);
          setTags(nextState);
        }
      }
      setSearchQuery('');
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && searchQuery === '') {
      if (isDeleting) {
        removeFromSelection(selectedItems[selectedItems.length - 1]);
        setIsDeleting(false);
      } else {
        setIsDeleting(true);
      }
    } else {
      setIsDeleting(false);
      if (e.key === 'Enter') {
        addToSelectionWithItem(searchQuery);
      }
    }
  }

  function updateSearchParams(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    if (e.target.value !== '' || e.nativeEvent.type !== 'deleteContentBackward') {
      setIsDeleting(false);
    }
  }

  const resetSearchParams = () => {
    setSearchQuery('');
    setIsDeleting(false);
  };

  return {
    selectedItems,
    removeFromSelection,
    searchQuery,
    updateSearchParams,
    isDeleting,
    handleInputKeyDown,
    resetSearchParams,
  };
}
