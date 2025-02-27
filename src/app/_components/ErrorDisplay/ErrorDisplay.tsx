type Props = {
  cause: string;
};

export default function ErrorDisplay({ cause }: Props) {
  return <div>{cause}</div>;
}
