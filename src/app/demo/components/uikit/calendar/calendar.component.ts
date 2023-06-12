import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
@Component({
    templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit, OnDestroy {
    events: any[];
    options: any;

    constructor(private eventService: EventService) {

    }


    ngOnInit() {
        this.eventService.get('assets/kalender.json').subscribe({
          next: (res : Record < string,any >)=>{
            this.events=res['data']
            this.options = { ...this.options, ...{ events: this.events } }
          }
        })
        this.options = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialDate: '2019-01-01',
          headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          contentHeight: 'auto',
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true
      };

    }

    ngOnDestroy() {
        // clearInterval(this.interval);
    }

}
