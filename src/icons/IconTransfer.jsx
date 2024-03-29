export function IconTransfer(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2em"
      width="2em"
      {...props}
    >
        <title>{props.title}</title>
      <path d="M15 12l5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z" />
    </svg>
  );
}