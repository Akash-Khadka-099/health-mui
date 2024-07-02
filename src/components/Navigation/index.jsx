/* eslint-disable react/prop-types */
import { Box, Popover, Stack, Typography } from "@mui/material";
import NepalFlagGif from "../../assets/gif/napalFlag.gif";
import { useState } from "react";
import { useEffect } from "react";
import { routes } from "../../routes/routes.contant";
import { Link, useLocation } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  const navbarList = [
    {
      route: routes.home,
      navbarLabel: "Home",
    },
    {
      navbarLabel: "About Us",
      childNav: [
        {
          route: routes.boardIntroduction,
          navbarLabel: "Board Introduction",
        },
        {
          route: routes.executiveCommittee,
          navbarLabel: "Executive Committee",
        },
      ],
    },
    {
      navbarLabel: "Project",
      route: routes.projectPlan,
    },

    {
      route: routes.staffProfile,
      navbarLabel: "Staff Profile",
    },
    {
      route: routes.boardMembers,
      navbarLabel: "Board Members",
    },
    {
      route: routes.gallery,
      navbarLabel: "Gallary",
    },
    {
      route: routes.contact,
      navbarLabel: "Contact",
    },
  ];
  return (
    <>
      {" "}
      <Stack direction={"row"} justifyContent={"space-between"} padding={4}>
        {" "}
        {/* <Image width={"200px"} src={LogoPng} /> */}
        <Stack direction={"column"} alignItems={"flex-start"}>
          <Stack direction={"row"} spacing={2}>
            <Typography>{"common:boardNameLabel"}:</Typography>
            <Typography fontWeight={600}>{"common:boardName"}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Typography>{"common:addressLabel"}:</Typography>
            <Typography fontWeight={600}>{"common:address"}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Typography>{"common:panLabel"}:</Typography>
            <Typography fontWeight={600}>{"common:panValue"}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"}>
          <img
            style={{
              width: "80px",
              height: "90%",
            }}
            src={NepalFlagGif}
          />
        </Stack>
      </Stack>
      <nav
        style={{
          position: "sticky",
          width: "100%",
          zIndex: 10,
          transition: "1s",
          boxShadow: `${scrolled ? "10px 0 10px" : ""}`,
        }}
      >
        <Stack
          direction={"row"}
          paddingY={2}
          justifyContent={"space-between"}
          bgcolor={"linear-gradient(red, blue)"}
          paddingX={{ sm: "1rem", base: "8rem", md: "6rem" }}
          style={{
            background:
              "linear-gradient(to right, rgba(106, 225, 230, 0.9), rgba(106, 162, 230,0.9))",
          }}
        >
          {/* <VStack justifyContent={"center"}>
            <Image width={"200px"} src={LogoPng} />
          </VStack> */}
          <Stack direction={"row"} alignItems={"center"}>
            {navbarList?.map((item, index) => {
              return (
                <>
                  <NavItem
                    key={index}
                    route={item.route}
                    navbarLabel={item.navbarLabel}
                    childNav={item.childNav}
                  />
                </>
              );
            })}
          </Stack>
        </Stack>
      </nav>
    </>
  );
};

export const NavItem = ({ navbarLabel, route, childNav }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const { pathname } = useLocation();

  return (
    <>
      {childNav?.length ? (
        <>
          <Typography
            fontWeight={pathname == route ? "bold" : ""}
            textAlign={"center"}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            {navbarLabel}
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Stack direction={"column"}>
              {childNav.map((item, index) => {
                return (
                  <Link
                    to={item?.route ?? ""}
                    key={index}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Box
                      className="menuBtn"
                      justifyContent={"center"}
                      padding={2}
                      // paddingX={8}
                      paddingX={{ base: 3, xl: 8 }}
                    >
                      <Typography
                        fontWeight={pathname == item.route ? "bold" : ""}
                        textAlign={"center"}
                        fontSize={{ base: "sm", xl: "md" }}
                      >
                        {item.navbarLabel}
                      </Typography>
                    </Box>
                  </Link>
                );
              })}
            </Stack>{" "}
          </Popover>
        </>
      ) : (
        <>
          <Link
            to={route ?? ""}
            style={{
              textDecoration: "none",
            }}
          >
            <Box
              className="menuBtn"
              justifyContent={"center"}
              padding={3}
              paddingX={{ base: 3, xl: 8 }}
            >
              <Typography
                fontWeight={pathname == route ? "bold" : ""}
                textAlign={"center"}
                fontSize={{ base: "sm", xl: "md" }}
              >
                {navbarLabel}
              </Typography>
            </Box>
          </Link>
        </>
      )}
    </>
  );
};

export default Navigation;
