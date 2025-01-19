import { useState } from "react";

//styles
import { Container, NotesContainer, EmptyMsgBox } from "../../styles/styles";
import { TopBox, Box, InputBox } from "./AllNotes.styles";

//icons
import { BiSearch } from "react-icons/bi";
import { FaSortAmountDown, FaTag, FaArchive, FaTrash } from "react-icons/fa";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//reddux
import { useDispatch, useSelector } from "react-redux";
import { toggleFiltersModal } from "../../features";
import { toggleCreateNoteModal, toggleMenu } from "../../features";

//components
import { FiltersModal, NoteCard } from "../../components";

import getAllNotes from "../../utils/getAllNotes";
import { v4 } from "uuid";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


const AllNotes = () => {
  const location = useLocation();
  const { pathname, state } = location;
  const dispatch = useDispatch();

  const { mainNotes } = useSelector((state) => state.notesList);
  const { viewFiltersModal } = useSelector((state) => state.modal);

  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // handle all filters
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  //clear.filters handler
  const clearHandler = () => {
    setFilter("");
  };

  const searchResult = () => {
    const searchedNotes = mainNotes.filter(({ title }) =>
      title.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (searchedNotes.length > 0) {
      return (
        <NotesContainer>
          {searchedNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
      );
    } else {
      return <EmptyMsgBox>No Results Found</EmptyMsgBox>;
    }
  };

  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { tagsList } = useSelector((state) => state.tags);

  const items = [
    { icon: <FaArchive />, title: "Archive", id: v4() },
    { icon: <FaTrash />, title: "Trash", id: v4() },
  ];

  const combinedList = [
    ...tagsList.map(({ tag, id }) => ({
      key: id,
      to: `/tag/${tag}`,
      state: tag,
      content: (
        <>
          <FaTag style={{ marginRight: 4 }} />
          {tag}
        </>
      ),
    })),
    ...items.map(({ icon, title, id }) => ({
      key: id,
      to: `/${title.toLowerCase()}`,
      state: title,
      content: (
        <>
          {icon}
          {title}
        </>
      ),
    })),
  ];

  return (
    <>
    <Box sx={{ backgroundColor: '#53A2BE',  display: 'flex',  minHeight: '100vh' }}>
      <Container >
        {/* filter modal */}
        {viewFiltersModal && (
          <FiltersModal
            handleFilter={filterHandler}
            handleClear={clearHandler}
            filter={filter}
          />
        )}
        {/* notes */}
        {mainNotes.length === 0 ? (
          <EmptyMsgBox>There are no notes</EmptyMsgBox>
        ) : (
          <>
            <TopBox>
              <InputBox>
                <div className="notes__search-icon">
                  <BiSearch />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search note title .."
                />
              </InputBox>

              <Box
                sx={{
                  flexBasis: "65%",
                  textAlign: "start",
                }}
              >
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
                  onClick={() => dispatch(toggleFiltersModal(true))}
                  className="nav__btn"
                >
                  <FaSortAmountDown /> Filters
                </Button>
              </Box>
              <Box>
                {state !== "Trash" && state !== "Archive" && (
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
                    onClick={() => dispatch(toggleCreateNoteModal(true))}
                    startIcon={
                      <AddCircleIcon
                        sx={{ justifyContent: "content", fontSize: "small" }}
                      />
                    }
                  >
                    {" "}
                    Create
                  </Button>
                )}
              </Box>
            </TopBox>
            <Box sx={{
              display: "flex",
              justifyContent: "flex-start",
              margin: "10px"}}
              >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="tabs example"
                sx={{ ".MuiTabs-indicator": { backgroundColor: '#53A2BE' } }} // Setting indicator color
              >
                {combinedList.map(({ key, to, state, content }) => (
                  <Tab
                    key={key}
                    value={state}
                    label={
                      <NavLink
                        to={to}
                        state={state}
                        className={({ isActive }) =>
                          isActive ? "active-item" : "inactive-item"
                        }
                        onClick={() => dispatch(toggleMenu(false))}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Calistoga",
                            display: "flex",
                            alignItems: "center",
                            color: "#53A2BE",
                            textDecoration: "none",
                            "&.active-item": {
                              fontWeight: "bold",
                              color: "'#FFD500'",
                            },
                            "&:hover": {
                              color: "#FFD500",
                            },
                          }}
                        >
                          {content}
                        </Typography>
                      </NavLink>
                    }
                  />
                ))}
              </Tabs>
            </Box>
        
            <Box>
              {searchInput !== ""
                ? searchResult()
                : getAllNotes(mainNotes, filter, searchInput)}
            </Box>
            
          </>
        )}
      </Container>
      </Box>
    </>
  );
};

export default AllNotes;
