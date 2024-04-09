import Select from "./Select";


export default function SortBy(props) {
      //eslint-disable-next-line
      const { options, setSortBy } = props;
      const handleClick = (value) => {
            setSortBy(value);
      }
      return <Select options={options} optionHandleClick={handleClick} />
}