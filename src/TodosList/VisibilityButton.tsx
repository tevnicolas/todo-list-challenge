import { VisibilityOption } from './TodosList';

type VisbilityButtonProps = {
  option: VisibilityOption;
  isSelected: string;
  onClick: (_option: VisibilityOption) => void;
};

export function VisbilityButton({ option, isSelected, onClick }: VisbilityButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(option)}
      className={`rounded-none pt-1 pb-1 pr-2 pl-2 focus:outline-none hover:border-focuslightblue ${isSelected === option ? 'bg-focusblue text-focuswhite' : 'bg-focuslightgrey text-focuslightblue'}`}
    >
      {option}
    </button>
  );
}
