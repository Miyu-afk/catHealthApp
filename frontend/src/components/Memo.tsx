interface MemoProps{
  onChange: (e:React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Memo =({onChange}:MemoProps) => {
  return(    
    <textarea className="textarea" placeholder="めも" onChange={onChange}></textarea>
  )
};

export default Memo;