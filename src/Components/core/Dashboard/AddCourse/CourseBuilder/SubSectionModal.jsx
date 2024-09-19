import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "./../../../../../Components/IconBtn";
import Upload from "../Upload";

export default function SubSectionModal({ modalData, setModalData, add = false, view = false, edit = false }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [uploadOption, setUploadOption] = useState("upload"); // new state for upload option

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const handleEditSubsection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (uploadOption === "upload") {
      formData.append("video", currentValues.lectureVideo);
    } else {
      formData.append("videoUrl", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      handleEditSubsection();
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);

    if (uploadOption === "upload") {
      formData.append("video", data.lectureVideo);
    } else {
      formData.append("videoUrl", data.lectureVideo);
    }

    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="primary-text fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-65 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
          {/* Video Upload Option */}
          <div className="flex items-center space-x-4">
            <label className="text-richblack-5">
              <input 
                type="radio" 
                value="upload" 
                checked={uploadOption === "upload"} 
                onChange={() => setUploadOption("upload")} 
              /> 
              Upload Video
            </label>
            <label className="text-richblack-5">
              <input 
                type="radio" 
                value="url" 
                checked={uploadOption === "url"} 
                onChange={() => setUploadOption("url")} 
              /> 
              YouTube URL
            </label>
          </div>

          {/* Conditional Rendering for Video Upload or URL Input */}
          {uploadOption === "upload" ? (
            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
          ) : (
            <div className="flex flex-col space-y-2">
              <label className="text-richblack-5" htmlFor="lectureVideo">
                YouTube Video URL {!view && <sup className="text-red-500">*</sup>}
              </label>
              <input
                disabled={view || loading}
                id="lectureVideo"
                placeholder="Enter YouTube Video URL"
                {...register("lectureVideo", { required: true })}
                className="border-blue-400 rounded-md ring-1 bg-transparent p-2 w-full"
              />
              {errors.lectureVideo && (
                <span className="ml-2 text-xs tracking-wide text-red-500">
                  YouTube URL is required
                </span>
              )}
            </div>
          )}

          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className=" text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-red-500">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="border-blue-400 rounded-md ring-1 bg-transparent p-2 w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-red-500">
                Lecture title is required
              </span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className=" text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-red-600">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="border-blue-400 rounded-md ring-1 bg-transparent p-2 resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
