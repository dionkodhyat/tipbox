import Button from './Button';
import { shuffleArrayRecursive } from '../utils/array';
import { JsonPlaceholderData } from './Gallery';

/**
 * ShuffleButton is a button that shuffles the data that it has beenn assigned to shuffle through
 * the component's prop using a recursive function. 
 * @param {Object} props - The props for the ShuffleButton component.
 * @param {JsonPlaceholderData[]} props.data - The data array to be shuffled.
 * @param {function} props.setData - A function to update the data array with the shuffled result.
 * @returns {JSX.Element} - The JSX element representing the ShuffleButton.
 */
type ShuffleButtonProps = {
    data : JsonPlaceholderData[]
    setData : (data : JsonPlaceholderData[]) => void
};

function ShuffleButton (
    { 
        data,
        setData,
    } : ShuffleButtonProps
) {

    const handleShuffleClick = () => {
        if (!data) return 
        const shuffledData = shuffleArrayRecursive([...data]);
        setData(shuffledData);
    }
        
    return (
        <div className="d-flex justify-content-center padding-y-medium">
            <Button onClick={handleShuffleClick}
                    className={"shuffle-btn"}>
                Shuffle
            </Button>
        </div>
  ) ;
};

export default ShuffleButton;