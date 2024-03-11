// work on this page: users can find all their submitted photos from their reviews here: should be account reviews instead
const AccountGallery = () => {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-[8%] w-full bg-darkBlue bg-opacity-40 flex items-center rounded-tl-lg rounded-tr-lg">
                <h1 className="h-[80%] w-full text-center text-[20px] md:text-[22px] font-semibold">Manage Gallery</h1>
            </div>
            <div className="h-[86%] w-full md:w-[80%] lg:w-[70%] ml-auto mr-auto flex flex-col items-center overflow-y-scroll">
                <div className="min-h-[25%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">
                    <div className="h-full w-1/2 flex flex-col items-center justify-end">
                        <label className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Name</label>
                        <input id="name" name="name" type="text" placeholder="John Gonzalez" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required />
                    </div>
                    <div className="h-full w-1/2 flex flex-col items-center justify-end">
                        <label className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Phone #</label>
                        <input id="phone" name="phone" type="text" placeholder="873-827-9012" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required />
                    </div>
                </div>
                <div className="min-h-[25%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">
                    <div className="h-[80%] w-full flex flex-col items-center justify-end">
                        <label className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Email</label>
                        <input id="name" name="name" type="text" placeholder="John Gonzalez" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required />
                    </div>
                </div>
                <div className="min-h-[50%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%] py-[1rem]">
                    <div className="h-full w-full flex flex-col items-center justify-start bg-darkBlue bg-opacity-40 rounded-lg">
                        <div className="min-h-[16%] w-full flex items-center bg-matteBlack bg-opacity-20">
                            <h4 className="text-[14px] h-[80%] w-full text-center">Password Reset</h4>
                        </div>
                        <div className="min-h-[60%] tall:min-h-[22%] w-[90%] flex items-start justify-center gap-[5%]">
                            <div className="h-[80%] w-1/2 flex flex-col items-center justify-end">
                                <label className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">Old Password</label>
                                <input id="name" name="name" type="text" placeholder="Password" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required />
                            </div>
                            <div className="h-[80%] w-1/2 flex flex-col items-center justify-end">
                                <label className="text-[13px] lg:text-[15px] w-full h-[30%] text-center">New Password</label>
                                <input id="phone" name="phone" type="text" placeholder="Password" className="h-[50%] w-[94%] bg-jetBlack bg-opacity-40 text-[12px] lg:text-[14px] font-semibold text-matteBlack outline-none text-center rounded-md" required />
                            </div>

                        </div>
                        <div className="h-[20%] w-full flex justify-center items-end">

                            <button className="h-[90%] w-[50%] bg-darkBlue cursor-pointer rounded-md">SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AccountGallery