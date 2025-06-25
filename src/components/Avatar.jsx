import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'
import { toast } from 'react-toastify'

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) {
            downloadImage(url)
        } else {
            setAvatarUrl(null)
        }
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

    const handleRemoveAvatar = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const customEvent = {
            preventDefault: () => {},
            stopPropagation: () => {},
            target: { files: [] }
        };

        setAvatarUrl(null);

        onUpload(customEvent, null);
    }

    return (
    <div className="flex flex-col items-center gap-4">
        <div className="relative group">
            {avatarUrl ? (
                <>
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="rounded-full border-4 border-my-cyan/50 shadow-lg group-hover:opacity-80 transition-all duration-300"
                        style={{ height: size, width: size, objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="bg-red-500/70 text-white p-2 rounded-full hover:bg-red-500 transition-all duration-300"
                            title="Remove image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </>
            ) : (
                <div
                    className="rounded-full bg-white/10 border-4 border-white/20 shadow-inner flex items-center justify-center"
                    style={{ height: size, width: size }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-1/2 w-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            )}
        </div>
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
            {uploading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg className="animate-spin h-5 w-5 text-my-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    </div>
);
}