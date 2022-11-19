import { Flex } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

type Props = {
  pokemonCount: number;
  fetchPokemonData: (URL: string) => Promise<void>;
};

export const Pagination: FC<Props> = (props: Props) => {
  const { pokemonCount, fetchPokemonData } = props;
  const ONE_PAGE_DISPLAY_USERS = 20;
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  const pageChange = useCallback(
    (selectedItem: { selected: number }) => {
      const page = selectedItem.selected;
      const offset = page * ONE_PAGE_DISPLAY_USERS;
      const pageURL = `${initialURL}?offset=${offset}&limit=${ONE_PAGE_DISPLAY_USERS}`;
      fetchPokemonData(pageURL);
    },
    [fetchPokemonData]
  );

  return (
    <Flex justifyContent="center" mb="16px">
      <div className={styles.pagination}>
        <ReactPaginate
          className="Pagination"
          pageCount={Math.ceil(pokemonCount / ONE_PAGE_DISPLAY_USERS)} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
          marginPagesDisplayed={2} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
          pageRangeDisplayed={2} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
          onPageChange={pageChange} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
          containerClassName="pagination" //ページネーションリンクの親要素のクラス名
          pageClassName="page-item" //各子要素(li要素)のクラス名
          pageLinkClassName="page-link" //ページネーションのリンクのクラス名
          activeClassName="active" //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます
          previousLabel="<" //前のページ番号に戻すリンクのテキスト
          nextLabel=">" //次のページに進むボタンのテキスト
          previousClassName="page-item" // '<'の親要素(li)のクラス名
          nextClassName="page-item" //'>'の親要素(li)のクラス名
          previousLinkClassName="page-link" //'<'のリンクのクラス名
          nextLinkClassName="page-link" //'>'のリンクのクラス名
          disabledClassName="disabled" //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
          breakLabel="..." // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
          breakClassName="page-item" // 上記の「…」のクラス名
          breakLinkClassName="page-link" // 「…」の中のリンクにつけるクラス
        />
      </div>
    </Flex>
  );
};
