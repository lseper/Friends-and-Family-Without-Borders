import React from 'react';
import EventInvitationsReport from '../components/eventInvitationsReport'
import "jest-enzyme"
import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});
it('renders', () => {
    const tree = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}
        maskRequired = {false}
        />
    )
    expect(tree).toMatchSnapshot()
});

it('displays the correct event name', () => {
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}
        maskRequired = {false}
        />
    )

    const firstDiv = wrapper.find('p')
    expect(firstDiv.text()).toBe("Example")
});

it('displays the correct example details', () => {
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}
        maskRequired = {false}
        />
    )

    const firstDiv = wrapper.find('h3').at(0)
    expect(firstDiv.text()).toBe("Example Details")
});

it('displays the correct start and end date', () => {
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }} 
        maskRequired = {false}      
        />
    )

    const firstDiv = wrapper.find('h3').at(1)
    expect(firstDiv.text()).toBe("April 30th 2021 5:30:00 pm until 7:30:00 pm")
});

it('displays the correct location/activity', () => {
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}  
        maskRequired = {false}      
        />
    )

    const firstDiv = wrapper.find('h3').at(2)
    expect(firstDiv.text()).toBe("Outdoors Golf")
});

it('displays the correct event creator', () => {
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}  
        maskRequired = {false}       

        />
    )

    const firstDiv = wrapper.find('div').at(3)
    expect(firstDiv.text()).toBe("John Doe invites you to:")
});

it('displays the correct mask requirements', () => {
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}  
        maskRequired = {false}       

        />
    )

    const firstDiv = wrapper.find('h3').at(3)
    expect(firstDiv.text()).toBe("Masks are NOT Required")
});

it('find the number of font awesome icons', () => {
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}   
        maskRequired = {false}      
        />
    )

    const numIcons = 5;
    const icon = wrapper.find('FontAwesomeIcon');
    expect(icon.length).toBe(numIcons);
});

it('find the Circular Progress bar icon for comfort level', () => {
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }} 
        maskRequired = {false}        
        />
    )

    const numIcons = 1;
    const icon = wrapper.find('CircularProgressbar');
    expect(icon.length).toBe(numIcons);
});

it('check that button click updates attending state when going button is pressed', () => {  
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {false}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}  
        maskRequired = {false}       
        />
    )
    
    const xButton = wrapper.find('button').at(0);
    xButton.simulate('click');
    expect(wrapper.state().attending).toBe(true);
});


it('check that button click updates attending state when not going button is pressed', () => {  
    const wrapper = mount(
        <EventInvitationsReport
        name="Example"
        dateStringStart="April 30th 2021 5:30:00 pm"
        dateStringEnd="April 30th 2021 7:30:00 pm"
        location={"Outdoors" + " " + "Golf"}
        details="Example Details"
        creator="John Doe"
        attending = {true}
        invitationId = {1}
        comfort = {.9}
        invitees = {{
            comfort_level: "0.975",
            confirmed: false,
            id: 2,
            priority: true,
            username: "abby"
        }, 
        {
            id: 3,
            username: "vicki"
        }}  
        maskRequired = {false}       
        />
    )
    
    const xButton = wrapper.find('button').at(1);
    xButton.simulate('click');
    expect(wrapper.state().attending).toBe(false);
});

