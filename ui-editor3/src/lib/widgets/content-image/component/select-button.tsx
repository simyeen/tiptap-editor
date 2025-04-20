import {CheckIcon} from 'lucide-react';
import toast from 'react-hot-toast';

interface SelectButtonProps {
  imageUrl: string; // 이미지 URL을 prop으로 받음
  isSelected: boolean; // 이미지가 선택되었는지 여부
  setSelectedImage: (alt: string) => void; // 선택된 이미지 URL을 설정하는 함수
}

export default function SelectButton({imageUrl, isSelected, setSelectedImage}: SelectButtonProps) {
  const handleClick = () => {
    if (isSelected) {
      setSelectedImage('');
      toast.error('대표 이미지를 해지했습니다.');
    } else {
      setSelectedImage(imageUrl);
      toast.success('대표 이미지가 설정됐습니다.');
    }
  };

  return (
    <button
      className={`group absolute right-1 top-2 rounded-2xl border border-[#898989] px-2 py-1 text-sm text-sz-lg-regular font-medium leading-6 transition-colors ${
        isSelected ? 'bg-black text-white' : 'bg-white text-[#898989] opacity-70'
      } hover:bg-black hover:text-white`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-1">
        <CheckIcon
          strokeWidth={4}
          className={`size-3 transition-colors ${
            isSelected ? 'text-[#EC1818]' : 'text-inherit'
          } group-hover:text-[#EC1818]`}
        />
        <span className="text-sm">대표</span>
      </div>
    </button>
  );
}
