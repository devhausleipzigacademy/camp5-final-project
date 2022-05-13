interface Props {
  title: string;
  location: string;
}

const Overlay = ({ title, location }: Props) => {
  return (
    <div className="flex-auto">
      <p>{title}</p>
      <p>{location}</p>
    </div>
  );
};

export default Overlay;
