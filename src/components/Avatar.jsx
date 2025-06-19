import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'
import { toast } from 'react-toastify'

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
            toast.error('Error loading image')
        }
    }

    const uploadAvatar = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(event, filePath)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
    <div className="flex flex-col items-center gap-4">
        {avatarUrl ? (
            <img
                src={avatarUrl}
                alt="Avatar"
                className="rounded-full border-4 border-my-cyan/50 shadow-lg"
                style={{ height: size, width: size, objectFit: "cover" }}
            />
        ) : (
            <div
                className="rounded-full bg-white/10 border-4 border-white/20 shadow-inner"
                style={{ height: size, width: size }}
            />
        )}
        <div className="relative w-full">
            <input
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-my-cyan/50 file:text-white
                    hover:file:bg-my-cyan/70
                    disabled:opacity-50"
            />
        </div>
    </div>
);
}