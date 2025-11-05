import NoDataImg from "../../../../assets/NoData.png";
export default function NoData() {
  return (
    <>
      <div className="text-center ">
        <img src={NoDataImg} alt="NOData-Img" className="" />
        <h5>No Data !</h5>
        <p className="text-muted">There’s nothing to show here right now.</p>
      </div>
    </>
  );
}
