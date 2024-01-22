import React from "react";

const CreateChannelModal = (props:any) => {
    
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" >
            <div className="flex flex-col bg-white rounded-lg shadow-lg p-4">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-xl">Create a new channel</h1>
                    <button onClick={() => props.toggleModal()} className="text-xl">&times;</button>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-sm">Name</span>
                    <input id="name" type="text" className="border-b-2 bg-transparent w-full h-full px-4 text-black focus:outline-none"/>
                    <span className="text-sm">Description</span>
                    <textarea id="description" className="border-b-2 bg-transparent w-full h-full px-4 text-black focus:outline-none"/>
                </div>
                <div className="flex flex-row justify-end gap-3">
                    <button onClick={() => props.toggleModal()} className="bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300">
                        <span className="text-sm">Cancel</span>
                    </button>
                    <button onClick={() => props.toggleModal()} className="bg-accent_red flex w-full h-8 justify-center items-center text-white hover:bg-red-300">
                        <span className="text-sm">Create</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateChannelModal;