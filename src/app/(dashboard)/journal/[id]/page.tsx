export const runtime = "edge";

type IParams = {
  params: {
    id: string;
  };
};

export default function EditorPage({ params }: IParams) {
  return <div>EditorPage</div>;
}
