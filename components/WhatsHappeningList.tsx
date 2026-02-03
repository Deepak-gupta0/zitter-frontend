import WhatsHappeningItem from "./WhatsHappeningItem";

const WhatsHappeningList = () => {

  const data = [1, 2,3];
  return (
    <div className="">
      {data.map((item, i) => (<WhatsHappeningItem key={i} />))}
      
    </div>
  )
}

export default WhatsHappeningList