import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { v4 } from "uuid";
import dayjs from "dayjs";

//styles
import { FixedContainer, DeleteBox } from "../Modal.styles";
import {
  Box,
  TopBox,
  StyledInput,
  AddedTagsBox,
  OptionsBox,
} from "./createNoteModal.styles";


//icons
import { FaTimes} from "react-icons/fa";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTagsModal,
  toggleCreateNoteModal,
  setMainNotes,
  setEditNote,
} from "../../../features";

//components
import TextEditor from "../../TextEditor/TextEditor";
import TagsModal from "../TagsModal/TagsModal";
import {
  Button,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";

const CreateNoteModal = () => {
  const dispatch = useDispatch();

  const { viewAddTagsModal } = useSelector((state) => state.modal);
  const { tagsList } = useSelector((state) => state.tags);
  const { editNote } = useSelector((state) => state.notesList);

  const [noteTitle, setNoteTitle] = useState(editNote?.title || "");
  const [value, setValue] = useState(editNote?.content || "");
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [noteColor, setNoteColor] = useState(editNote?.color || "");
  const [priority, setPriority] = useState(editNote?.priority || "low");

  //deleting tag from added tags when the tag is deleted from the main tags list
  useEffect(() => {
    setAddedTags((prev) =>
      prev.filter(({ tag }) => tagsList.find((obj) => obj.tag === tag))
    );
  }, [tagsList]);

  //add tags to note
  const tagsHandler = (tag, type) => {
    const newTag = tag.toLowerCase();

    if (type === "add") {
      setAddedTags((prev) => [...prev, { tag: newTag, id: v4() }]);
    } else {
      setAddedTags(addedTags.filter(({ tag }) => tag !== newTag));
    }
  };

  // create note
  const createNoteHandler = () => {
    if (!noteTitle) {
      toast.error("You must add title");
      return;
    } else if (value === "<p><br></p>") {
      toast.error("You must write note");
      return;
    }

    const date = dayjs().format("DD/MM/YY h:mm A");

    let note = {
      title: noteTitle,
      content: value,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime(),
    };

    if (editNote) {
      note = { ...editNote, ...note };
    } else {
      note = {
        ...note,
        date,
        createdTime: new Date().getTime(),
        editedTime: null,
        isPinned: false,
        isRead: false,
        id: v4(),
      };
    }

    dispatch(setMainNotes(note));
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  };

  return (
    <FixedContainer>
      {viewAddTagsModal && (
        <TagsModal type="add" addedTags={addedTags} handleTags={tagsHandler} />
      )}

      <Box>
        <TopBox>
          <Typography
            sx={{
              fontFamily: "Calistoga",
              display: "flex",
              alignItems: "center",
              color: "#176087",
              fontSize: "1.5rem",
            }}
          >
            Create Note
          </Typography>
          
          <DeleteBox
            className="createNote__close-btn"
            onClick={() => dispatch(toggleCreateNoteModal(false))}
          >
            <FaTimes />
          </DeleteBox>
        </TopBox>

        <StyledInput
          type="text"
          value={noteTitle}
          name="title"
          placeholder="Title ..."
          onChange={(e) => setNoteTitle(e.target.value)}
        />

        <div>
          <TextEditor value={value} setValue={setValue} color={noteColor} />
        </div>

        <AddedTagsBox>
          {addedTags.map(({ tag, id }) => (
            <div key={id}>
              <span className="createNote__tag">{tag}</span>
              <span
                onClick={() => tagsHandler(tag, "remove")}
                className="createNote__tag-remove"
              >
                <FaTimes />
              </span>
            </div>
          ))}
        </AddedTagsBox>

        <OptionsBox>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#176087",
              "&:hover": {
                backgroundColor: "#176087",
              },
              fontFamily: "Calistoga",
              borderRadius: "10px",
            }}
            className="nav__btn"
            onClick={() =>
              dispatch(toggleTagsModal({ type: "add", view: true }))
            }
          >
            Add Tag
          </Button>

          <div>
            <InputLabel
              htmlFor="color"
              sx={{
                fontFamily: "Calistoga",
                borderRadius: "10px",
              }}
            >
              BgColor :
            </InputLabel>
            <NativeSelect
              value={noteColor}
              id="color"
              onChange={(e) => setNoteColor(e.target.value)}
            >
              <option value="">White</option>
              <option value="#ffcccc">Red</option>
              <option value="#ccffcc">Green</option>
              <option value="#cce0ff">Blue</option>
              <option value="#ffffcc">Yellow</option>
            </NativeSelect>
          </div>

          <div>
            <InputLabel
              variant="standard"
              htmlFor="priority"
              sx={{
                fontFamily: "Calistoga",
                borderRadius: "10px",
              }}
            >
              Priority:
            </InputLabel>
            <NativeSelect
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              inputProps={{
                name: "priority",
                id: "priority",
              }}
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </NativeSelect>
          </div>
        </OptionsBox>

        <div className="createNote__create-btn">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD500",
              "&:hover": {
                backgroundColor: "#FFD500",
              },
              fontFamily: "Calistoga",
              borderRadius: "10px",
            }}
            onClick={createNoteHandler}
            startIcon={
              <AddCircleIcon
                sx={{ justifyContent: "content", fontSize: "small" }}
              />
            }
          >
            {editNote ? (
              <span>Save</span>
            ) : (
              <>
                <span> Create</span>
              </>
            )}
          </Button>
        </div>
      </Box>
    </FixedContainer>
  );
};

export default CreateNoteModal;
