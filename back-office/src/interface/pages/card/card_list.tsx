import { TablePagination } from "../../components/table_pagination"


export const CardList = () => {
  return (
        <>
    <div>CardList</div>
    <TablePagination title="Cartes" createPath="/card/create" createTitle="Ajouter des cartes" th={["Num Serie", "Num Carte","Date Creation", ""]}/>
    </>
  )
}
