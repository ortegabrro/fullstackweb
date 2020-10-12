import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut, visibility } from '../animations/app.animation';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss'],
    // tslint:disable-next-line: no-host-metadata-property
    host: {
        '[@flyInOut]': 'true',
        style: 'display:block;'
    },
    animations: [
        visibility(),
        flyInOut(),
        expand()
    ]
})
export class DishdetailComponent implements OnInit {

    @ViewChild('fform') feedbackFormDirective;
    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;
    formDishDetail: FormGroup;
    objComment = Comment;
    errMess: string;
    dishcopy: Dish;
    obj = new Comment();
    visibility = 'shown';

    formErrors = {
        author: '',
        comment: ''
    };

    validationMessages = {
        author: {
            required: 'Author is required.',
            minlength: 'Author must be at least 2 characters long.'
        },
        comment: {
            required: 'Comments are required.'
        }
    };


    constructor(private dishService: DishService,
                private location: Location,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                @Inject('BaseURL') public BaseURL: any) { }

    ngOnInit(): void {
        this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
        this.route.params
            .pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
            .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
                errmess => this.errMess = errmess);
        this.formDishDetail = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2)]],
            comment: ['', [Validators.required]],
            rating: '5'
        });
        this.formDishDetail.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // reset form validation messages
    }

    onValueChanged(data?: any): void {
        if (!this.formDishDetail) { return; }
        const form = this.formDishDetail;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && (control.dirty || !control.valid)) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + '';
                        }
                    }
                }
            }
        }
    }

    setPrevNext(dishId: string): void {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack(): void {
        this.location.back();
    }

    onSubmit(): void {
        const d = new Date();
        this.obj = this.formDishDetail.value;
        this.obj.date = d.toISOString();
        this.dishcopy.comments.push(this.obj);
        this.dishService.putDish(this.dishcopy)
            .subscribe(dish => {
                this.dish = dish; this.dishcopy = dish;
            },
                errmess => { this.dish = null; this.dishcopy = null; this.errMess = (errmess as any); });
        this.formDishDetail.reset();
        this.feedbackFormDirective.resetForm();
    }

}
