import { DriverRequest, useDriverContext } from "../../../Providers/DriverContext";
import icon_paint from "../../../assets/paint.svg";
import icon_trash from "../../../assets/trash.svg";
import red_eyes from "../../../assets/red-eyes.png";
import style from "./style.module.scss";

interface DriverCardProps {
  driver: DriverRequest;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  EditModaValue?: (editModal: any) => void;
}

export const DriverCard = ({ driver, setVisible, EditModaValue }: DriverCardProps) => {
  const { deleteDriver, setId, GetInfoDriverAndTransport, setUserVisibleFull }: any = useDriverContext();
  return (
    <>
      <li className={style.li}>
        <div>
          <div>
            <span className="title two white">{driver.name}</span>
          </div>
          <div>
            <img
              src={icon_paint}
              alt="pincel"
              onClick={() => {
                setVisible(true);
                if (EditModaValue) {
                  EditModaValue(driver);
                }
              }}
            />
            <img
              src={icon_trash}
              alt="lixeira"
              onClick={() => {
                setId(driver.id);
                deleteDriver.mutate();
              }}
            />
            <img
              width={20}
              src={red_eyes}
              alt="olhos"
              onClick={async() => {
                await GetInfoDriverAndTransport(driver.id);
                setUserVisibleFull(true)
              }}
            />
          </div>
        </div>
      </li>
    </>
  );
};
