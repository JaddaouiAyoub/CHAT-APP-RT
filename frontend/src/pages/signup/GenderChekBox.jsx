const GenderChekBox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className="flex">
        <div className="form-control">
            <label className={`label grap-2 cursor-pointer ${selectedGender === "male" ? "selected":""} `}>
                <span className="label-text text-gray-100">Male</span>
                <input type="checkbox" className="checkbox border-slate-900"
                    checked={selectedGender==='male'}
                    onChange={()=> onCheckboxChange("male")}

                />
            </label>
        </div>
        <div className="form-control">
        <label className={`label grap-2 cursor-pointer ${selectedGender === "female" ? "selected":""} `}>
                <span className="label-text text-gray-100">Female</span>
                <input type="checkbox" className="checkbox border-slate-900" 
                     checked={selectedGender==='female'}
                     onChange={()=> onCheckboxChange("female")}
                />
            </label>
        </div>
    </div>
  )
}

export default GenderChekBox

//Starter checkbox component 
/* 
const GenderChekBox = () => {
  return (
    <div className="flex">
        <div className="form-control">
            <label className={'label grap-2 cursor-pointer'}>
                <span className="label-text">Male</span>
                <input type="checkbox" className="checkbox border-slate-900" />
            </label>
        </div>
        <div className="form-control">
            <label className={'label grap-2 cursor-pointer'}>
                <span className="label-text">Female</span>
                <input type="checkbox" className="checkbox border-slate-900" />
            </label>
        </div>
    </div>
  )
}

export default GenderChekBox
*/