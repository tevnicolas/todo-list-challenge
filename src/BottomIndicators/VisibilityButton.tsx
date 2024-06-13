import { Visibility } from '../data';

type VisbilityButtonProps = {
  option: Visibility;
  selected: string;
  onClick: (_option: Visibility) => void;
};

export function VisbilityButton({ option, selected, onClick }: VisbilityButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(option)}
      className={`rounded-none pt-1 pb-1 pr-2 pl-2 focus:outline-none hover:border-focuslightblue ${selected === option ? 'bg-focusblue text-focuswhite' : 'bg-focuslightgrey text-focuslightblue'}`}
    >
      {option}
    </button>
  );
}
