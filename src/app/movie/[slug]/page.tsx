type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: Props) {
  const slug = (await props.params).slug;

  return <div>My Movie: {slug}</div>;
}
