import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { CloudHail } from 'lucide-react'
import { USER_API_END_POINT } from '@/constant/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'react-toastify'
import axios from 'axios'


const EditProfileModel = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: user?.profile?.resume || ''
  });
  const dispatch=useDispatch();
  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
  const formData=new FormData();
  formData.append('fullname',input.fullname);
  formData.append('email',input.email);
  formData.append('phoneNumber',input.phoneNumber);
  formData.append('bio',input.bio);
  // formData.append('skills',input.skills);
  formData.append('skills', JSON.stringify(input.skills.split(',').map(skill => skill.trim())));

  if(input){
    formData.append('file',input.file);
    try {
   
      const res= await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true

      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        console.log("✅ Profile updated successfully:", res.data.user);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  setInput(false);
    console.log(input);
  }


    const fileChangeHandler=(e)=>{
      const file=e.target.files?.[0];
      setInput({...input,file})
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
        {/* Close Button */}
        <DialogClose asChild>
          <button
            onClick={() => setOpen(false)}
            onChange={changeEventHandler}
            className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl"
            aria-label="Close"
          >
            ×
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" action="" onSubmit={submitHandler}>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label htmlFor="fullname">Name</label>
              <Input id='fullname' name='fullname' className='w-full' value={input.fullname}   onChange={changeEventHandler} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <Input id='email' name='email' className='w-full' value={input.email}  onChange={changeEventHandler}/>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phoneNumber">Number</label>
              <Input id='phoneNumber' name='phoneNumber' className='w-full' value={input.phoneNumber}   onChange={changeEventHandler} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="bio">Bio</label>
              <Input id='bio' name='bio' className='w-full' value={input.bio}   onChange={changeEventHandler} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="skills">Skills</label>
              <Input id='skills' name='skills' className='w-full' value={input.skills}   onChange={changeEventHandler} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="file">Resume</label>
              <Input id='file' name='file' type='file' className='w-full' accept='application/pdf' onChange={fileChangeHandler} />
            </div>
          </div>

          <DialogFooter>
            {
              loading
                ? <Button disabled variant='default'>Please Wait</Button>
                : <Button type="submit">Update</Button>
            }
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModel