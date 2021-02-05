export const SearchPanel = () => {
  /*
    1. 当用户在input框输入值或者选择select框的时候， param变化
    2. 当param变化的时候，去请求工程列表
    3. 如果 ok是true，说明请求成功了
  */

  const [param, setParam] = React.useState({
    name: "",
    personId: "",
  });

  const [users, setUsers] = React.useState([]);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetch().then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(event) =>
            setParam({
              ...param,
              personId: event.param.value,
            })
          }
        >
          {users.map((user) => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};
