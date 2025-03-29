interface MenuAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface MenuProps {
  actions: MenuAction[];
}

export function Menu({ actions }: MenuProps) {
  return (
    <ul className="bg-grey-0 absolute top-[25px] right-[2.0156px] z-30 list-none rounded-md shadow-md">
      {actions.map((action, index) => (
        <li key={index}>
          <button
            className="hover:bg-grey-50 flex w-full cursor-pointer items-center gap-[1.6rem] border-none bg-none px-12 py-5 text-left text-[1.4rem] transition"
            onClick={action.onClick}
          >
            {action.icon}
            <span className="whitespace-nowrap">{action.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
