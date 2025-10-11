import styles from "../css/Body.module.scss";

interface MemoProps{
  onChange: (e:React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Memo =({onChange}:MemoProps) => {
  return(    
    <textarea className={styles.memoArea} placeholder="ひとことメモ" onChange={onChange} name="postContent" />
  )
};

export default Memo;